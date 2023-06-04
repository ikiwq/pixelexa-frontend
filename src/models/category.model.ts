export class CategoryModel{
    id : number = -1;
    
    name : string = "";
    created_at : Date = new Date();

    articles_last_day : number = 0;
    articles_last_7_days : number = 0;
}

export interface CategoryDictionary{
    [key : string] : CategoryModel[];
}