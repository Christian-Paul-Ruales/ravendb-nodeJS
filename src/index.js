const { DocumentStore } = require('ravendb');

const store = new DocumentStore('http://127.0.0.1:8981', 'ejemplo');
store.initialize();

const session = store.openSession();

let element = {
    title: "tITLE",
    numerico: 1,
    decimal: 99.99,
    fecha: new Date(),
    
}

const running = async() => {
    //  await queryAll()

  const idCreated =  await create(element);
  await read(idCreated);
  await update(idCreated,"nuevo nuevo");
  await read(idCreated);
  await del(idCreated);
  await read(idCreated);

}

const queryAll = async () => {
    const query = await session.query({ collection: '@empty' }).whereEquals('title', 'Nuevo Titulo');
    const resutls = await query.all();
    console.log('-------------------------Ejemplo de query');
    console.log(resutls);

}

const create = async( myElement) => {
    console.log ("---------------------Crear")

    await session.store(myElement, 'element/');
    await session.saveChanges();

    return myElement.id;
}

const read = async(id) => {
    console.log ("---------------------Mostrar")

    let element = await session.load(id);
    if(element !== null){
        console.log (element)
    }else {
        console.log ("elemento "+id+ " NO ENCONTRADO")

    }

}

const update = async(id, title) => {
    console.log ("---------------------Actualizar")

    let element= await session.load(id);
    element.title = title;
    element.fecha = new Date();
    await session.saveChanges();

}

const del = async(id) => {
    console.log('-----------------Eliminar')
    let element= await session.load(id);
    await session.delete(element);
    await session.saveChanges();
   
}
running();
