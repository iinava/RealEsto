import { CardList } from './Card'

function List({posts}){
  return (
    <div className='flex flex-col gap-[50px]   text-white'>
      {posts.map(item=>(
        <CardList  key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List