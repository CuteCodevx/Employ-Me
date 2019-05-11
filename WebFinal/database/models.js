module.exports={
    comment:{
       username : {type:String,required:true},
       name : {type:String,required:true},
       evaluators:{type:String,required:true},
       score:{type:Number,required:true},
       comments:{type:String},
       date:{type:String}
    },
    employee:{
        username:{type:String,required:true},
        password:{type:String,required:true},
        firstName:{type:String,require:true},
        lastName:{type:String,required:true},
        email:{type:String,required:true},
        phoneNumber:{type:String,required:true},
        degreeLevel:{type:String,required:true},
        major:{type:String,required:true},
        aveScore:{type:Number}
    },
    employer:{
        username:{type:String,required:true},
        password:{type:String,required:true},
        name:{type:String,required:true},
        city:{type:String,required:true},
        postcode:{type:String,required:true},
        address:{type:String,required:true},
        email:{type:String,required:true},
        aveScore:{type:Number},
        isCompany:{type:Number}
    },
    publication:{
        username:{type:String,required:true},
        name:{type:String,required:true},
        career:{type:String,required:true},
        careerType:{type:String,required:true},
        city:{type:String,required:true},
        description:{type:String,required:true},
        requirement:{type:String,required:true},
        date:{type:String},
        pay:{type:String,required:true}
    },
    jobRequest:{
        account:{type:String,required:true},
        name:{type:String,required:true},
        job:{type:String,required:true},
        city:{type:String,required:true},
        introduction:{type:String,required:true},
        type:{type:String,required:true}
    },
    receivedInvite:{
        employee:{type:String,required:true},
        employer:{type:String,required:true},
        job:{type:String,required:true},
        date:{type:String,required:true}
    },
    receivedApplication:{
        employeeAccount:{type:String,required:true},
        employerAccount:{type:String,required:true},
        career:{type:String,required:true},
        date:{type:String,required:true}
    }
}