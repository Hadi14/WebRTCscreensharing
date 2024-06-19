let localstram;
let remotestram;
let peerConnection;
const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}





let init = async () => {
    localstram = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    document.getElementById('user-1').srcObject = localstram;
    createOffer();
}


let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers);
    remotestram = new MediaStream();
    document.getElementById('user-2').srcObject = remotestram;

    localstram.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localstram);
    })
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remotestram.track();
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log('New Ice Candidate', event.candidate);
        }
    }


    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('offer:', offer);
}


init();