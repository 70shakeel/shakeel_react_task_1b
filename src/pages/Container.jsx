import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./Card.jsx";
import axios from "axios";
const style = {
  width: 400,
};
export const Container = () => {
  const [items, setItems] = useState([]);
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
          setItems(response.data.list);
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
    const renderCard = useCallback((items, index) => {
      return (
        <Card
          key={items.id}
          image={items.photo}
          desc={items.title}
          author={items.username}
          likes={items.like}
          index={index}
          id={items.id}
          moveCard={moveCard}
        />
      );
    }, []);
    console.log("items:", items);
    return (
      <>
        <div>
          {items.length > 0 && items.map((item, i) => renderCard(item, i))}
        </div>
        <button onClick={(e) => handlePageCount(e)}>Prev</button>
        <button onClick={(e) => handlePageCount(e)}>Next</button>
      </>
    );
  }
};
