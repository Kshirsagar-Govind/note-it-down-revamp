const ExpenseCard = ({ data}) => {
  return (
    <div className="">

      {data.map(item => (
        <div
          key={Math.random()}
          className="rounded-md expense-div flex justify-between p-3 my-2 items-end"
          style={{
            backgroundColor: `${item.color}`,
          }}
        >
          <div className="">
            <p
            className="text-[12px]"
            >{item.category}</p>
            <h1 className="text-lg"> {item.expense}</h1>
          </div>
          <h1 className="text-lg">{item.cost}/-</h1>
        </div>
      ))}
    </div>
  )
}
export default ExpenseCard;