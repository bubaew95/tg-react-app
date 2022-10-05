import Item from "../Item/Item"


const MainPage = ({goods, onAddToCart}) => {
    return (
        <div className='row mt-2'>
            {
              goods.map(item => {
                return <Item
                  key={item.id}
                  onAddToCart={onAddToCart} 
                  item={item}/>
              })
            }
          </div>
    )
}

export default MainPage;