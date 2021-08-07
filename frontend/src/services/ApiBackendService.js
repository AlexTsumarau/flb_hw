import http from "../http-common";

const getAll = ({ pageIndex, pageSize, sortByCond }) => {
  console.log('getAll', pageIndex, pageSize, sortByCond);
  if(sortByCond === null){
    return http.get("/connections?projection=ConnectionsDto&page="+pageIndex+"&size="+pageSize);
  }else{
    return http.get("/connections?projection=ConnectionsDto&page="+pageIndex+"&size="+pageSize + "&sort=" + sortByCond);
  }
};

const getLines = ({ pageIndex, pageSize, sortByCond }) => {
  return http.get("/lines?projection=LinesDto&page="+pageIndex+"&size="+pageSize + "&sort=" + sortByCond);
};

const getAllLines = () => {
  return http.get("/lines?projection=LinesDto&&size=1000");
};

const create = (data) => {
  return http.post("/connections", data);
};

const update = (id, data) => {
  return http.patch(`/connections/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/connections/${id}`);
};

const removeLine = (id) => {
  return http.delete(`/lines/${id}`);
};

const findBy = ({pageIndex, pageSize, searchTitle, searchLine, sortByCond}) => {
  console.log('findBy', pageIndex, pageSize, searchTitle, searchLine, sortByCond);
  sortByCond = sortByCond!=null ? '&sort=' + sortByCond : '';

  if( searchTitle.length > 0 && searchLine.length > 0 ){

    return http.get(`/connections/search/findByNameContainingIgnoreCaseAndLineNumber?projection=ConnectionsDto&name=${searchTitle}&number=${searchLine}&size=${pageSize}&page=${pageIndex}${sortByCond}`);
  }else if( searchTitle.length > 0 && searchLine.length === 0 ){

    return http.get(`/connections/search/findByNameContainingIgnoreCase?projection=ConnectionsDto&name=${searchTitle}&size=${pageSize}&page=${pageIndex}${sortByCond}`);
  }else if( searchTitle.length === 0 && searchLine.length > 0 ){

    return http.get(`/connections/search/findByLineNumber?projection=ConnectionsDto&number=${searchLine}&size=${pageSize}&page=${pageIndex}${sortByCond}`);
  }else{

    return getAll(pageIndex, pageSize, sortByCond);
  }
};

const ApiBackendService = {
  getAll,
  getLines,
  getAllLines,
  create,
  update,
  remove,
  removeLine,
  findBy,
};

export default ApiBackendService;
