var Enroll=require('../models/enroll');

module.exports.improvePerformance=function(req,res){
    Enroll.improvePerformance(req,res);
}
module.exports.getEnrollment=function(req,res){
   Enroll.getEnrollment(req,res);
}
