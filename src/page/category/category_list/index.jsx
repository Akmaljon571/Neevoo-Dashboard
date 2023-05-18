import { useEffect } from "react"
import { host } from "../../../content/start"

function CategoryList() {
      useEffect(() => {
      fetch(host +  '/categories/list')
      .then(re => re.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className="list__wrapper">
        <h2>Categories</h2>
    </div>
  )
}
export default CategoryList