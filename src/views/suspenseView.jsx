// Taken from Lab
export function SuspenseView({promise,error}){

        // no promise, nothing from api
        if (!promise){
            return <span>No data</span>; // message shows that there is no data

        }
       
        if (error){ // if fail promise and error 
            return <span>
                {error.toString()}</span>; // display error message 
 

        }
        return( // if good show loading image until no more loading
            <div 
                style={{ 
                backgroundColor: "#383E42",
                width: "100%", 
                height: "100%", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}
            >
                <img
                    src= "https://pub-24c9d380cdc747d1a8fff80e058e907c.r2.dev/output-onlinegiftools%20(1).gif"
                    alt="loading"
                    style={{width: "125px"}}
                />
            </div>);

}