const express=require('express');
const app=express();
const PORT = 3000;
app.use(express.json());
const employeeRoutes=require('./routes/employeeRoutes');
app.use('/employees',employeeRoutes);
app.get('/',(req,res)=>{
    res.send('Employee management API is running');
});
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});