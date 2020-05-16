const { DocumentStore } = require('ravendb');

const store = new DocumentStore('http://127.0.0.1:8981', 'ejemplo');
store.initialize();

const session = store.openSession();

let element = {
    title: "mi titulo",
    numerico: 1,
    decimal: 99.99,
    fecha: new Date(),
    
}

const running = async() => {
  //  await create(element);
    await read();
    await update("Nuevo Titulo");
    await read();
    await del();
    await read();

}

const create = async( myElement) => {
    await session.store(myElement, 'element/');
    console.log(myElement);
    await session.saveChanges();
}

const read = async() => {
    let element = await session.load('element/0000000000000000001-A');
    console.log ("---------------------Mostrar")

    console.log (element)
}

const update = async(title) => {
    console.log ("---------------------Actualizar")

    let element= await session.load('element/0000000000000000001-A');
    element.title = title;
    element.fecha = new Date();
    await session.saveChanges();

    let elementUpdated= await session.load('element/0000000000000000001-A');


}

const del = async() => {
    let element= await session.load('element/0000000000000000001-A');
    await session.delete(product);
    await session.saveChanges();
   
}
running();
