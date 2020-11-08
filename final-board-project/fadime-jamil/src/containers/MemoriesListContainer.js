import React, { useState, useEffect } from "react";
import db from "../firebaseConfig";
import MemoriesList from "../components/memory/MemoriesList";
import { useParams } from "react-router-dom";

export default function MemoriesListContainer() {
  const [memories, setMemories] = useState([]);

  const [albumDetail, setAlbumDetail] = useState("");

  const fetchAlbumDetail = async () => {
    const res = await db.collection("Albums").doc(albumId).get();
    setAlbumDetail(res.data());
  };
  useEffect(() => {
    fetchAlbumDetail();
  }, []);

  let { albumId } = useParams();

  useEffect(() => {
    db.collection("Albums")
      .doc(albumId)
      .collection("Memories")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          
          if (change.type === "added") {
            const memory = {
              id: change.doc.id,
              data: change.doc.data(),
            };
            setMemories((prevMemories) => [...prevMemories, memory]);
           
          }
          if (change.type === "modified") {
            const modifiedMemory = {
              id: change.doc.id,
              data: change.doc.data(),
            };
            setMemories((prevMemories) => {
              let newMemories = [...prevMemories];
              const moditiedMemoryIndex = newMemories.findIndex(
                (memory) => memory.id === change.doc.id
              );
              newMemories.splice(moditiedMemoryIndex, 1, modifiedMemory);
              return newMemories;
            });
          }
          if (change.type === "removed") {
            const removedId = change.doc.id;
            setMemories((prevState) => {
              let newMemories = [...prevState];
              newMemories = newMemories.filter(
                (memory) => memory.id !== removedId
              );
              return newMemories;
            });
            console.log("something is removed !");
          }
        });
      });
  }, []);

  return (
    <MemoriesList
      memories={memories}
      albumName={albumDetail ? albumDetail.name : null}
      albumId={albumId}
      setMemories={setMemories}
    />
  );
}
