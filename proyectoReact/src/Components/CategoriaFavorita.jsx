import React, { use } from 'react'

const CategoriaFavorita = () => {

    const dispach = useDispatch();
    const categoria = useSelector(state => state.categoria.categoriaFavorita);

     




    return (
    <div>CategoriaFavorita</div>



  )
}

export default CategoriaFavorita