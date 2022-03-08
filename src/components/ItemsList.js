import Items from "./Items";

const ItemsList = ({ items, setItems, searchWord }) => {
  return (
    <div className="mt-5 w-[100%]">
      {items
        /* eslint-disable */
        .filter((val) => {
          if (searchWord === "") {
            return val;
          } else if (
            val.task.toLowerCase().includes(searchWord.toLowerCase())
          ) {
            return val;
          }
        })
        .map((item) => (
          <Items
            item={item}
            items={items}
            setItems={setItems}
            key={item.id}
            isEdit={item.isEdit}
          />
        ))}
    </div>
  );
};

export default ItemsList;
