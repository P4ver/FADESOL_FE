import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData } from '../store/productSlice';
import { postProductData, updateProductData } from '../store/productSlice';
import { deleteProductData } from '../store/productSlice';

const ProductComponent = () => {
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector((state) => state.product);
    const [displayEdit, setDislayEdit] = useState(null)


const [ formData, setFormData ] = useState({
        pu_Produit:"",		
        type_Produit:"",		
        prix_Vente:"",		
        note_Produit:"",		
        code_Barre:"",		
        numero_Serie:"",		
        unite:"",		
        statut:""
    })

useEffect(() => {
    dispatch(fetchProductData()); // Dispatch the fetchProductData action when the component mounts
}, [dispatch]);


const handlePostChange = (event)=>{
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]:value
    })
    console.log(event)
  }


const handleSubmit = async () =>{
    try {
    // Dispatch the postProductData action
    await dispatch(postProductData(formData));
    // Clear the form input fields
        setFormData({
        id_Produit:"",		
        pu_Produit:"",		
        type_Produit:"",		
        prix_Vente:"",		
        note_Produit:"",		
        code_Barre:"",		
        numero_Serie:"",		
        unite:"",		
        statut:""
    });
    } catch (error) {
    // Handle errors, if any
    console.error("Failed to add product:", error);
    }
}

//====================== Mise à jour des produits ================================

const handleUpdateChange = (id_Produit, event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [id_Produit]: {
          ...formData[id_Produit],
          [name]: value
        }
    });
  };


const handleUpdate = (productId) => {
    if (productId && formData[productId]) {
      console.log("=>>>>",formData[productId])
      console.log(productId)
      dispatch(updateProductData({ productId: productId, updatedProductData: formData[productId] }));

    } else {
      console.error('Product ID or edited product data is missing.');
    }
  };
    // const handleEdit = (id_Produit)=>{
    //     setDislayEdit(id_Produit)
    // }
    const handleEdit = (product)=>{
        setDislayEdit(product.id_Produit)
        setFormData(product);
    }
    
//================================================================================


const handleDelete = (id_Produit) => {
        dispatch(deleteProductData(id_Produit));
}


return (
    <>        
    <p >Affichage des produits</p>
    <ul>
        {productData.map((product) => (
            <li key={product.id_Produit}>
                {product.type_Produit}
            </li>
        ))}
    </ul>


    <form  onSubmit={handleSubmit}>
        <div>
        <h3>Ajouter un product</h3>
        <input type="text" placeholder="prix unitaire" name="pu_Produit" value={formData.pu_Produit} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="type" name ="type_Produit" value ={formData.type_Produit} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="prix de vente" name="prix_Vente" value={formData.prix_Vente} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="note de produit" name="note_Produit" value={formData.note_Produit} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="code barre" name="code_Barre" value={formData.code_Barre} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="numero de serie" name="numero_Serie" value={formData.numero_Serie} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="unite" name="unite" value={formData.unite} onChange={(event)=>handlePostChange(event)}/>
        <input type="text" placeholder="statut" name="statut" value={formData.statut} onChange={(event)=>handlePostChange(event)}/>
        <button type="submit">Ajouter</button>
        </div>
    </form>


    {/* <ul>
        {productData.map((product) => (
            <li key={product.id_Produit}>
                <strong>Prix unitaire:</strong> {product.pu_Produit}, <strong>Type:</strong> {product.type_Produit}, <strong>Prix Vente:</strong> {product.prix_Vente} 
                ,<strong>note_Produit:</strong> {product.note_Produit}, <strong>code_Barre:</strong> {product.code_Barre} , <strong>numero_Serie:</strong> {product.numero_Serie} , <strong>unite:</strong> {product.unite}, , <strong>statut:</strong> {product.statut} 

                {displayEdit === product.id_Produit &&
                    <>
                        <input type="text" value={formData[product.id_Produit]?.pu_Produit || ''} name="pu_Produit" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="prix unitaire" />
                        <input type="text" value={formData[product.id_Produit]?.type_Produit || ''} name="type_Produit" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="type" />
                        <input type="text" value={formData[product.id_Produit]?.prix_Vente || ''} name="prix_Vente" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="prix de vente" />
                        <input type="text" value={formData[product.id_Produit]?.note_Produit || ''} name="note_Produit" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="note de produit" />
                        <input type="text" value={formData[product.id_Produit]?.code_Barre || ''} name="code_Barre" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="code barre" />
                        <input type="text" value={formData[product.id_Produit]?.numero_Serie || ''} name="numero_Serie" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="numero de serie" />
                        <input type="text" value={formData[product.id_Produit]?.unite || ''} name="unite" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="unite" />
                        <input type="text" value={formData[product.id_Produit]?.statut || ''} name="statut" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="statut" />
                        <button onClick={() => handleUpdate(product.id_Produit)}>Update</button>
                        <button onClick={()=>handleEdit(null)}>Cancel</button>
                    </>               
                }
                {!displayEdit &&
                    <button onClick={()=>handleEdit(product.id_Produit)}>Edit</button>
                }
                <button onClick={()=>handleDelete(product.id_Produit)}>Delete</button>
            </li>
        ))}
    </ul> */}
    <ul>
        {productData.map((product) => (
            <li key={product.id_Produit}>
                            <strong>Prix unitaire:</strong> {product.pu_Produit}, <strong>Type:</strong> {product.type_Produit}, <strong>Prix Vente:</strong> {product.prix_Vente} 
                ,<strong>note_Produit:</strong> {product.note_Produit}, <strong>code_Barre:</strong> {product.code_Barre} , <strong>numero_Serie:</strong> {product.numero_Serie} , <strong>unite:</strong> {product.unite}, , <strong>statut:</strong> {product.statut} 

                {displayEdit === product.id_Produit ? (
                    <>
                        <input type="text" value={formData[product.id_Produit]?.pu_Produit || ''} name="pu_Produit" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="prix unitaire" />
                        <input type="text" value={formData[product.id_Produit]?.type_Produit || ''} name="type_Produit" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="type" />
                        <input type="text" value={formData[product.id_Produit]?.prix_Vente || ''} name="prix_Vente" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="prix de vente" />
                        <input type="text" value={formData[product.id_Produit]?.note_Produit || ''} name="note_Produit" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="note de produit" />
                        <input type="text" value={formData[product.id_Produit]?.code_Barre || ''} name="code_Barre" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="code barre" />
                        <input type="text" value={formData[product.id_Produit]?.numero_Serie || ''} name="numero_Serie" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="numero de serie" />
                        <input type="text" value={formData[product.id_Produit]?.unite || ''} name="unite" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="unite" />
                        <input type="text" value={formData[product.id_Produit]?.statut || ''} name="statut" onChange={(event) => handleUpdateChange(product.id_Produit, event)} placeholder="statut" />
                        <button onClick={() => handleUpdate(product.id_Produit)}>Update</button>
                        <button onClick={() => setDislayEdit(null)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.id_Produit)}>Delete</button>
                    </>
                )}
            </li>
        ))}
    </ul>

    </>
    );
}
 
export default ProductComponent;

