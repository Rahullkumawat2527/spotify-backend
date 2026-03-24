import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
    privateKey: 'private_8Mc+KfHOf3izIHelikZ96ZQ9bkA=', // This is the default and can be omitted
});


async function uploadMusicAtImageKit(musicFile) {


    const response = await client.files.upload({
        file: musicFile,
        fileName: 'music_' + Date.now(),
        folder : "SPOTIFY-BACKEND/music"
    });

    return response
}

export default uploadMusicAtImageKit