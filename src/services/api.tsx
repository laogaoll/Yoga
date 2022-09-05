//封装API
import  request from './request';

export const GetClassApi = ()=>
    request.get('/api/user/classes');
export const GetDayClassApi = (data:any)=>
    request.get('./api/user/getDayClass',data);
export const LoginApi = (data:any)=>
    request.get('/api/user/login',data);
export const GetClassByIdApi = (data:any) =>
    request.get('./api/user/getClassById',data);
export const  GetSignupApi = () =>
    request.get('/api/user/getSignup');
export const GetIsblackApi = (data:any) => 
    request.get('/api/user/getIsBlack',data);
export const GetSignupByIdApi = (data:any) =>
    request.get('./api/user/getSignupById',data);
export const GetUnameApi = (data:any) =>
    request.get('/api/user/getUname',data);
export const AddSignupApi =(data:any) =>
    request.post('/api/user/addSignup',data);
export const SignupDownApi = (data:any) =>
    request.delete('/api/user/signupDown',data);
export const addCourseApi = (data:any) =>
    request.post('/api/user/addCourse',data);
export const GetBlacklistApi = (data:any) =>
    request.get('/api/user/getBlacklist',data);
export const AddBlacklistApi = (data:any) =>
    request.post('/api/user/addBlacklist',data);