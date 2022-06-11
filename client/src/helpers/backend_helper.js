import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

//  .............................. AUTH ....................................
export const userLogin = user => post(url.USER_LOGIN, user, { params: { ...user } });
export const userSignup = user => post(url.USER_SIGNUP, user);   // todo remove later by /register

//  .............................. USERS ....................................
export const addUser = user => post(url.ADD_USER, user)
export const searchUsers = user => post(url.SEARCH_USERS, user)
export const getUser = user => get(url.GET_USER, { params: { ...user } })
export const getUserAccount = user => get(url.ACCOUNT_USER, { params: { ...user } })
export const updateUser = user =>  put(url.UPDATE_USER, user)
export const deleteUser = user => del(url.DELETE_USER, { params: { ...user } })

//  .............................. PRODUCTS ....................................
export const searchProducts = product => post(url.SEARCH_PRODUCTS, product)
export const getProductById = id => get(url.GET_PRODUCT, { params: { id } })
export const addProduct = product => post(url.ADD_PRODUCT, product)
export const updateProduct = product =>  put(url.UPDATE_PRODUCT, product)

//  .............................. PACKAGES ....................................
export const searchPackages = item => post(url.SEARCH_PACKAGES, item);
export const getPackageById = id => get(url.GET_PACKAGE, { params: { id } });
export const addPackage = item => post(url.ADD_PACKAGE, item);
export const updatePackage = item =>  put(url.UPDATE_PACKAGE, item);

//  .............................. BLOGS ....................................
export const searchBlogs = blog => post(url.SEARCH_BLOGS, blog)
export const getBlogById = id => get(url.GET_BLOG, { params: { id } })
export const addBlog = blog => post(url.ADD_BLOG, blog)
export const updateBlog = blog =>  put(url.UPDATE_BLOG, blog)

//  .............................. RESOURCES ....................................
// add user
export const addManyResources = resources => post(url.ADD_MANY_RESOURCES, resources)
