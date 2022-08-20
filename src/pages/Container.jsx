import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./Card.jsx";
import axios from "axios";
const style = {
  width: 400,
};
export const Container = () => {
  const [cards, setCards] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const headers = {
    "Content-Type": "application/json",
    "x-project": "cmVhY3R0YXNrOjVmY2h4bjVtOGhibzZqY3hpcTN4ZGRvZm9kb2Fjc2t5ZQ==",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const body = {
    payload: {},
    page: currentPage,
    limit: 10,
  };
  const handlePageCount = (e) => {
    e.preventDefault();
    if (e.target.innerText == "Prev") {
      if (currentPage == 1) {
        setcurrentPage(10);
      } else {
        setcurrentPage(currentPage - 1);
      }
    } else if (e.target.innerText == "Next") {
      if (currentPage == 10) {
        setcurrentPage(1);
      } else {
        setcurrentPage(currentPage + 1);
      }
    }
    console.log("event", e);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios
        .post(
          "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
          body,
          {
            headers,
          }
        )
        .then((response) => {
          console.log("getData", response.data);
          setCards(response.data.list);
        });
    };

    getData();
  }, [currentPage]);

  {
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
    const renderCard = useCallback((cards, index) => {
      return (
        <Card
          key={cards.id}
          image={cards.photo}
          desc={cards.title}
          author={cards.username}
          likes={cards.like}
          index={index}
          id={cards.id}
          moveCard={moveCard}
        />
      );
    }, []);
    console.log("cards:", cards);
    return (
      <>
        <div>
          {cards.length > 0 && cards.map((card, i) => renderCard(card, i))}
        </div>
        <button onClick={(e) => handlePageCount(e)}>Prev</button>
        <button onClick={(e) => handlePageCount(e)}>Next</button>
      </>
    );
  }
};
