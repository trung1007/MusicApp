import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { FIREBASE_DB } from './config/firebase';

export const useFetchMusic = () => {
  const [albumList1, setAlbum] = useState([]);
  const [headerAlbum1, setHeaderAlbum] = useState([]);
  const [album11, setAlbum1] = useState([]);
  const [album21, setAlbum2] = useState([]);
  const [album31, setAlbum3] = useState([]);

  const fetchMusic = async () => {
    const albumTmp = [];

    const AlbumList = await getDocs(collection(FIREBASE_DB, 'AlbumList'));
    AlbumList.forEach((doc) => {
      // console.log("Document: " ,doc.data());
      albumTmp.push({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        genre: doc.data().genre,
        musicList: doc.data().musicList,
      });
    });

    setAlbum(albumTmp);
    setHeaderAlbum(albumTmp.filter((item) => item.genre === 'Nổi Bật Hôm Nay'));
    setAlbum1(albumTmp.filter((item) => item.genre === 'Có Thể Bạn Muốn Nghe'));
    setAlbum2(albumTmp.filter((item) => item.genre === 'Vừa Nghe Vừa Lak'));
    setAlbum3(albumTmp.filter((item) => item.genre === 'Chill'));
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return { albumList1, headerAlbum1, album11, album21, album31 };
};