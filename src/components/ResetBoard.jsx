const resetBoard = () => {
  setAllBoard({
    active: 0,
    boards: [
      {
        name: "My Trello Board",
        bgcolor: "#069",
        list: [],
      },
    ],
  });
};

// Pass resetBoard to Header component
<Header resetBoard={resetBoard} />;
