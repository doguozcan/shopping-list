import {
  faAdd,
  faCheck,
  faLeftLong,
  faRightLong,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function ShoppingList() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (!newItem.trim()) return
    setItems([
      ...items,
      { id: Date.now(), name: newItem, count: 1, buy: false },
    ])
    setNewItem('')
  }

  const handleAmount = (itemId, amount) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        if (item.count + amount) {
          return { ...item, count: item.count + amount }
        }
      }
      return item
    })
    setItems(updatedItems)
  }

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId)
    setItems(updatedItems)
  }

  const itemBought = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, buy: !item.buy }
      }
      return item
    })
    setItems(updatedItems)
  }

  return (
    <div className="bg-[#eba03f] p-3 m-5 rounded-md overflow-y-auto max-h-[550px] max-sm:w-1/3 w-1/2 ">
      <p className="text-3xl text-center mb-2 text-white uppercase">
        shopping list
      </p>
      <div className="m-2 flex gap-2 justify-center items-center">
        <input
          className="w-full p-2 border-2 border-[#FFBB64] bg-[#FFBB64] text-white placeholder-white rounded focus:outline-none focus:border-[#f8a63a]"
          placeholder="Add item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addItem()
            }
          }}
        ></input>
        <button
          onClick={addItem}
          className="bg-[#FFBB64] hover:bg-[#f8a63a] text-white font-bold p-2 rounded shadow"
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </div>
      <div className="items">
        <div className="item">
          <div className="flex flex-col">
            {items.map((item) => (
              <div className="flex justify-between p-2 m-2 bg-[#FFBB64] text-white text-xl rounded-md">
                <button onClick={() => itemBought(item.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <p className={`${item.buy ? 'line-through' : ''} capitalize`}>
                  {item.name}
                </p>
                <div className="flex gap-2 items-center justify-center">
                  <button onClick={() => handleAmount(item.id, -1)}>
                    <FontAwesomeIcon icon={faLeftLong} />
                  </button>
                  <p>{item.count}</p>
                  <button onClick={() => handleAmount(item.id, 1)}>
                    <FontAwesomeIcon icon={faRightLong} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#eba952] text-sm ml-1"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col text-center text-white bg-[#f8a63a] rounded-md p-2 m-2 text-xl gap-1 mt-10">
          <p>Total items: {items.length}</p>
          <p>
            Total amount: {items.reduce((total, item) => total + item.count, 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
