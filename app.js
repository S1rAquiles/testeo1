//Librerias y dependencias
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const baseDatosModels = require('./models/baseDeDatos.js');

//Configuración del Servidor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
port = app.listen(5000);
console.log('Servidor corriendo exitosamente en el puerto 5000');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/',(req,res)=>{
  res.render('index.ejs')
});



app.get('/login',(req,res)=>{
  res.render('iniciarSesion.ejs');
  });
  
  
  app.post('/login',(req,res)=>{
  
   const {admin,password} = req.body;
  
     if(admin == "gato" && password == "gato"){
      login=true;
      res.redirect('/productos');
     }else{
      login=false;
      res.redirect('/iniciarSesion');
     }
  
  });
    
  
  app.get('/add',(req,res)=>{
  res.render('add.ejs');
  });
  
  //---------------------------------------------------------
  app.get('/addImagen',(req,res)=>{
  res.render('addImagen.ejs');
  });
  
  
  app.post('/addImagen',(req,res)=>{
  baseDatosModels.aggIMG(req,res);
  });
  
  
  app.post('/addPost',(req,res)=>{   
  baseDatosModels.aggDato(req,res);
  });
  
  
  app.get('/productos',(req,res)=>{
    baseDatosModels.mostrarProductos(req,res);
  });
  app.get('/imagenesvista',(req,res)=>{
    baseDatosModels.mostrarImagenes(req,res);
  });
  //-------------------------------------------------------
  // GET /editar/:id
  app.get('/update/:id',(req, res) => {
  baseDatosModels.mostrarUpdate(req,res);
  
  });
  //-------------------------------------------------------
  // POST /editar/:id
  app.post('/update/:id', (req, res) => {
   baseDatosModels.update(req,res);
  });
  //-------------------------------------------------------
  // GET /eliminar/:id
  app.get('/delete/:id', (req, res) => {
   baseDatosModels.mostrarDelete(req,res);
  });
  //-------------------------------------------------------
  // POST /eliminar/:id
  app.post('/delete/:id', (req, res) => {
   baseDatosModels.deletee(req,res);
  });
  //------------------------------------------------------
  app.get('/categorias', (req, res) => {
   baseDatosModels.getCategorias(req,res);
  });
  //-------------------------------------------------------
  app.get('/addCategorias', (req, res) => {
   res.render('addcategoria.ejs');
  });
  //-------------------------------------------------------
  app.post('/addcategorias', (req, res) => {
   baseDatosModels.postCategorias(req,res);
  });
  //-------------------------------------------------------
  app.get('/updateCategoria/:id',(req,res)=>{
   baseDatosModels.mostrarUpdateC(req,res);
  });
  //-------------------------------------------------------
  app.post('/updateCategoria/:id',(req,res)=>{
  baseDatosModels.updateCateg(req,res);
  });
  //-------------------------------------------------------
  //Metodo para manejar rutas no encontradas
  app.get('/*',(req,res)=>{
  res.render('notfound.ejs')
  });
  //-------------------------------------------------------
  