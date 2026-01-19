// Taken from lab
export function resolvePromise(prms, promiseState){
    promiseState.promise = prms; // store promise in a state to know whats awaited
    promiseState.data = null; // resets data
    promiseState.error = null; // resets error
    const currPromise = prms; // sets the promise currently handlded

    function PromiserACB(result){ // when success
        if (promiseState.promise !== currPromise) // if another promise has replaced the current promise, ignore
            return;
        promiseState.data = result; // prevents race conditions (overlapping promises)

    }
    
    function ErrorerACB(err){ // when fails
        if (promiseState.promise !== currPromise) // if another promise has replaced the current promise, ignore
            return;
        promiseState.error = err; // store error in state

    }

    if (!prms) { // if no promise, stop
        return;

    }

   
    prms.then(PromiserACB).catch(ErrorerACB) // attach success and fail to promise
}