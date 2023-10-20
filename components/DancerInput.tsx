import { CoupleInput } from './CoupleInput';

export function DancerInput({
    competitionType,    
    handleSubmit,
    inputNumber
}: {
    competitionType: string,
    handleSubmit: (values: any) => void,
    inputNumber: number
}) {
    return (
        <>
            {(competitionType === 'solo') ? <CoupleInput // this will be replaced by a different component
                handleSubmit={handleSubmit} 
                coupleNumber={inputNumber} 
            /> : null}
            {(competitionType === 'mixed couples') ? <CoupleInput // mixing couples will be implemented later on
                handleSubmit={handleSubmit} 
                coupleNumber={inputNumber} 
            /> : null}
            {(competitionType === 'fixed couples') ? <CoupleInput 
                handleSubmit={handleSubmit} 
                coupleNumber={inputNumber} 
            /> : null}            
        </>

    );
};



