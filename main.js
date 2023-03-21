var JPSeguros = function () {
    var datos = [
        { nombre: "Ford", modelos: ["Ka", "Focus 3", "Mondeo", "Fusion"] },
        { nombre: "Chevrolet", modelos: ["Cruze", "Onix", "S10", "Tracker"] },
        { nombre: "Fiat", modelos: ["Toro", "Bravo", "Palio", "Punto"] }
    ];
    this.modelo = null,
    this.marca = null,
    this.anio = null,
    this.paso = 0,
    this.opcion = null      

    /*  inicio funcion para tener opciones, ya sea para que pueda volver hacia atras, o salir */
    function inicio() {
        console.log(`Opcion:${this.opcion}`);
        this.opcion = null;
        this.paso = 0;
        while (this.opcion == null || this.opcion != 0) {
            if (this.opcion == 9) {
                this.paso--;
            } else if (this.opcion == 0) {
                break;
            } else {
                if (this.paso != 5) {
                    this.paso++;
                } else {
                    if (this.opcion == 1) {
                        this.paso = 1;
                    }
                }
            }

            this.opcion = resolverPaso();
            var valido = validarPaso();

            if (this.opcion !== 0 && !valido) {
                this.opcion = null;
                this.paso--;
            }
        }
    }

    function validarPaso() {
        return (this.opcion != null && this.opcion.length > 0)
    }

    function resolverPaso() {
        console.log(`Cargando paso: ${this.paso}`);
        switch (this.paso) {
            case 1:
                return paso1();
            case 2:
                // Guardo la marca para poder cargar los modelos cuando se utiliza la opcion de volver.
                return paso2();
            case 3:                                
                return paso3();
            case 4:
                this.anio = paso4();
                return this.anio;
            case 5:
                return paso5();
            default:
                this.opcion = 0;
                break;
        }
    };
    
    /* comienza el simulador con la opcion de cotizar o salir */
    function paso1() {
        this.paso = 1;
        return window.prompt(`
        Bienvenido al Cotizador de Seguros de JP Seguros

        *- MENU (Elija una opcion)
            1.- Cotizar mi auto
            0.- Salir
    `);
    }

    /* elijo la marca de vehiculo que deseo cotizar ahora , con opcion de salir o volver hacia atras */
    function paso2() {
        this.paso = 2;        
        let marcas = getMarcas();
        let seleccion = window.prompt(`Seleccione la marca de su vehiculo \r *- Marca del Vehiculo (Elija una opcion) \r${marcas} \r9.- Volver \r0.- Salir`);
        let indice = parseInt(seleccion) - 1;
        this.marca = datos[indice];     
        return seleccion;
    }

    /* selecciono el modelo del vehiculo a cotizar, con opcion de salir o volver hacia atras*/
    function paso3() {
        this.paso = 3;
        var modelos = getModelos();        
        var seleccion = window.prompt(`*- Seleccione el modelo \r${modelos} \r\r9.- Volver \r0.- Salir`);
        var indice = parseInt(seleccion) - 1;
        this.modelo = this.marca.modelos[indice];
        return seleccion;
    }
    

    /* introduzco el año del vehiculo, con opcion de salir o volver hacia atras */
    function paso4() {
        this.paso = 4;
        return window.prompt(`
        Introduzca Año del Vehiculo

        9.- Volver
        0.- Salir
    `)
    }

    /* me devuleve el resultado total, detalladamente ,con opcion de salir o volver a cotizar otro vehiculo */
    function paso5() {
        this.paso = 5;
        let resultado = resultadoFinal();
        return prompt(`
        Su seguro mensual es de:
        ${resultado}
        1.- Cotizar otro Vehiculo
        0.- Salir
    `);
    }

    function getMarcas(){
        var list = '';
        for(var i = 0; i < datos.length; i++){
            list += `${i+1}.- ${datos[i].nombre} \r`;
        }
        return list;
    }

    function getModelos(){
        var list = '';
        for(var i = 0; i < this.marca.modelos.length; i++){
            list += `${i+1}.- ${this.marca.modelos[i]} \r`;
        }
        return list;
    }

    function resultadoFinal() {
        let resultado = 2000;
        let marcaImporte = 0;
        let modeloImporte = 0;
        let fechaImporte = 0;

        if (this.marca.nombre == "Ford") {
            marcaImporte = 750;
        } else if (this.marca.nombre == "Chevrolet") {
            marcaImporte = 1300;
        } else {
            marcaImporte = 300;
        }
        
        if (this.marca.nombre == "Chevrolet" && this.modelo == "S10") {
            modeloImporte = 500;
        }

        if (this.anio >= 2021) {
            fechaImporte = 800;
        } else if (this.anio >= 2013 && this.anio >= 2021) {
            fechaImporte = 400;
        } else {
            fechaImporte = 100;
        }

        let total = resultado + marcaImporte + modeloImporte + fechaImporte;

        return `
        Impuesto por Base: $ ${resultado}
        Impuesto por Modelo: $ ${modeloImporte}
        Impuesto por Marca: $ ${marcaImporte}
        Impuesto por Antiguedad: $ ${fechaImporte}
        ---------------------------------------------
        Total: $ ${total}
    `
    }

    inicio();
}

var jpSeguros = new JPSeguros();

function cargarApp(){
    jpSeguros = new JPSeguros();    
}