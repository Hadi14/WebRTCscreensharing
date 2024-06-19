let localstram;
let remotestram;
let peerConnection;
const servers = {
    iceServers: [
        url
    ]
}





let init = async () => {
    localstram = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    document.getElementById('user-1').srcObject = localstram;
    createOffer();
}


let createOffer = async () => {
    peerConnection = new RTCPeerConnection();
    remotestram = new MediaStream();
    document.getElementById('user-2').srcObject = localstram;

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('offer:', offer);
}


init();