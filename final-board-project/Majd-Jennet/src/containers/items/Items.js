import React, { useState, useEffect } from "react";
import Item from "../../components/item/Item";
import ItemForm from "../../components/item/ItemForm";
import SortItemsBy from "../../components/item/SortItemsBy"
import {byTitle, byTitleD, byDeadline, byDeadlineD} from "../../functions"

const ItemsContainer = ({ boardsItems, boardTitle, boardsId }) => {
  const [items, setItems] = useState(boardsItems);

  const sortItems = (sortedBy) => {
    switch(sortedBy){
      case "2":
          setItems((prevItems) => {
            let newItems = [...prevItems]
            let newItem = newItems.sort(byTitle)
            return newItem
          })
          break
      case "4":
          setItems((prevItems) => {
            let newItems = [...prevItems]
            let newItem = newItems.sort(byTitleD)
            return newItem
          })
          break
      case "1":
          setItems((prevItems) => {
            let newItems = [...prevItems]
            let newItem = newItems.sort(byDeadline)
            return newItem
          })
          break
      case "3":
          setItems((prevItems) => {
            let newItems = [...prevItems]
            let newItem = newItems.sort(byDeadlineD)
            return newItem
          })
          break
      default:
          setItems((prevItems) => {
            let newItems = [...prevItems]
            let newItem = newItems.sort(byTitle)
            return newItem
          })
    }

  }

  useEffect(()=> {
    setItems(boardsItems)
  },[boardsItems])

  const notCompletedItems = items.filter((item) => item.completed === false)
 
  return (
    <>
      <SortItemsBy sortItems={sortItems} />
      <div>
        {notCompletedItems.map((item) => {
          return <Item key={item.id} task={item} boardsId={boardsId} 
          boardsItems={boardsItems} setItems={setItems}/>;
        })}
      </div>
      <div>
        <ItemForm
          boardTitle={boardTitle}
          boardsItems={boardsItems}
          boardsId={boardsId}
        />
      </div>
    </>
  );
};

export default ItemsContainer;

