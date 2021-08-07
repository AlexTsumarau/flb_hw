import http from "../http-common";

const getAll = ({ pageIndex, pageSize }) => {
  return http.get("/connections?projection=ConnectionsDto&page="+pageIndex+"&size="+pageSize);
};

const get = (id) => {
  return http.get(`/connections/${id}`);
};

const create = (data) => {
  return http.post("/connections", data);
};

const update = (id, data) => {
  return http.put(`/connections/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/connections/${id}`);
};

const findBy = ({pageIndex, pageSize, searchTitle, searchLine}) => {
  console.log(pageIndex, pageSize, searchTitle, searchLine);
  if( searchTitle.length > 0 && searchLine.length > 0 ){

    return http.get(`/connections/search/findByNameContainingIgnoreCaseAndLineNumber?projection=ConnectionsDto&name=${searchTitle}&number=${searchLine}&size=${pageSize}&page=${pageIndex}`);
  }else if( searchTitle.length > 0 && searchLine.length === 0 ){

    return http.get(`/connections/search/findByNameContainingIgnoreCase?projection=ConnectionsDto&name=${searchTitle}&size=${pageSize}&page=${pageIndex}`);
  }else if( searchTitle.length === 0 && searchLine.length > 0 ){

    return http.get(`/connections/search/findByLineNumber?projection=ConnectionsDto&number=${searchLine}&size=${pageSize}&page=${pageIndex}`);
  }else{

    return getAll(pageIndex, pageSize);
  }

};

const ApiBackendService = {
  getAll,
  get,
  create,
  update,
  remove,
  findBy,
};

export default ApiBackendService;
