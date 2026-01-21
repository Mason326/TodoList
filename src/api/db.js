// import {supabase} from "../supabase";


export default async function fetchData() {
    try {
        const { data, error } = await supabase
        .from('products')
        .select()
        return data;
    }
    catch(e) {
        throw e;
    }    
}

