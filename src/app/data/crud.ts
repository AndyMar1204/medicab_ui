import { Observable } from "rxjs";

export interface Crud<T> {
    findAll():Observable<T[]>;
    findById(id:number):Observable<T>;
    update(t:T,id:number):Observable<T>;
    save(t:T):Observable<T>;
    delete(id:number):Observable<T>;
}
