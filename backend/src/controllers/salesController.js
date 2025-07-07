import salesModel from "../models/Sales.js";

//Array de funciones vacìo
const salesController = {};

//SELECT
salesController.getAllSales = async (req, res) => {
  try {
    const sales = await salesModel.find();
    res.status(200).json(sales);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
salesController.insertSales = async (req, res) => {
  try {
    //Pedir datos
    const { product, category, customer, total } = req.body;

    if (total < 0) {
      res.status(400).json({ message: "Ingrese un valor válido" });
    }

    const newSales = new salesModel({ product, category, customer, total });
    res.status(200).json({ message: "Sales Insert" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
salesController.updateSales = async (req, res) => {
  try {
    const { product, category, customer, total } = req.body;
    const updateSales = await salesModel.findByIdAndUpdate(
      req.params.id,
      { product, category, customer, total },
      { new: true }
    );
    res.status(200).json({ message: "Sales Update" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// D E L E T E
salesController.deleteSales = async (req, res) => {
  try {
    await salesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Sales deleted" });
    res.status(200).json({ message: "Sales Deleted" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//=========================
//ventas por categoría
//=========================

salesController.getSalesByCategory = async(req, res)=>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    //para sacar los datos de especificos de una colección
                    $group:{
                        _id: "$category", //colección de la que se quiere sacar los datos
                        totalVentas: {$sum: "$total"} //campo que va a sumar 
                        //Ejemplo: de la categria MUEBLES saca el total de las ventas
                    }
                },
                //odernar resultados
                {
                    $sort: {totalVentas: -1},
                },
            ]
        );

        res.status(200).json(resultado);

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ message: "Internal server error"})
    }
}

//=========================
//productos más vendidos
//=========================

salesController.getSellingProducts = async(req, res)=>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    //para sacar los datos de especificos de una colección
                    $group:{
                        _id: "$product", //colección de la que se quiere sacar los datos
                        totalVentas: {$sum: 1} //campo que va a sumar para saber cuantos productos de han vendido de un producto especifico
                        //Ejemplo: de la tabla productos cuenta cuantas veces se repite un producto en la tabla y los cuenta para saber
                        //cual es el que más se repite
                    }
                },
                //odernar resultados
                {
                    $sort: {totalVentas: -1},
                },
                {
                    $limit: 5 //mostrar solo los 5 productos más vendidos 
                }
            ]
        );       

        res.status(200).json(resultado);

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ message: "Internal server error"})
    }
}

//=========================
//productos menos vendidos
//=========================

salesController.getSellingProductsM = async(req, res)=>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    //para sacar los datos de especificos de una colección
                    $group:{
                        _id: "$product", //colección de la que se quiere sacar los datos
                        totalSales: {$sum: 1} //campo que va a sumar para saber cuantos productos de han vendido de un producto especifico
                        //Ejemplo: de la tabla productos cuenta cuantas veces se repite un producto en la tabla y los cuenta para saber
                        //cual es el que más se repite
                    }
                },
                //odernar resultados
                {
                    $sort: {totalSales: 1},
                },
                {
                    $limit: 5 //mostrar solo los 5 productos menos vendidos 
                }
            ]
        );       

        res.status(200).json(resultado);

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ message: "Internal server error"})
    }
}

//=========================
//Ganancias totales
//=========================

salesController.totalEarnings = async (req, res) =>{
    try {
        
        const resultado = await salesModel.aggregate(
            [
                {
                    //para mostrar la sumatoria de un campo especifico
                    $group:{
                        _id: null, //no tiene una colección especifica
                        gananciasTotales: {$sum: "$total"} //campo para saber la suma de todos los totales

                    }
                }
            ]
        )
        res.status(200).json(resultado);

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ message: "Internal server error"})
    }
}

//=========================
//Cliente frecuente
//=========================
salesController.getFrecuentCustumer = async(req, res)=>{
    try {
        const resultado = await salesModel.aggregate
        (
            [
                {
                    //para sacar los datos de especificos de una colección
                    $group:{
                        _id: "$customer", //colección de la que se quiere sacar los datos
                        comprasRealizadas: {$sum: 1} //la cantidad de veces que aprece en la tabla de ventas y le va a decir cuantas veces a comprado

                    }
                },
                //odernar resultados
                {
                    $sort: {comprasRealizadas: -1},
                },
                //limitar
                {
                    $limit: 3 
                }
            ]
        );       

        res.status(200).json(resultado);

    } catch (error) {
        console.log("error" + error)
        res.status(500).json({ message: "Internal server error"})
    }
}

export default salesController;
