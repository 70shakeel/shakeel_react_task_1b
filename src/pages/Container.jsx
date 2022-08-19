import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./Card.jsx";
const style = {
  width: 400,
};
export const Container = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: "Write a cool JS library",
        image: "https://wallpaperaccess.com/full/252570.jpg",
        desc: "something is worth nothing if something and nothing have the same value, says no one ever!",
        author: "shakeel",
        likes: "25",
      },
      {
        id: 2,
        text: "Make it generic enough",
        image: "https://wallpaperaccess.com/full/252570.jpg",
        desc: "something is worth nothing if something and nothing have the same value, says no one ever!",
        author: "shakeel",
        likes: "25",
      },
      {
        id: 3,
        text: "Write README",
        image: "https://wallpaperaccess.com/full/252570.jpg",
        desc: "something is worth nothing if something and nothing have the same value, says no one ever!",
        author: "shakeel",
        likes: "25",
      },
    ]);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          image={card.image}
          desc={card.desc}
          author={card.author}
          likes={card.likes}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    }, []);
    return (
      <>
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};
