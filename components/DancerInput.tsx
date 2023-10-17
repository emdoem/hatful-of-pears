import { Label } from '@/components/ui/label';
import { FormDescription } from '@/components/ui/form'
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
            {(competitionType === 'solo') ? <CoupleInput handleSubmit={handleSubmit} coupleNumber={inputNumber} /> : null}
            {(competitionType === 'mixed couples') ? <CoupleInput handleSubmit={handleSubmit} coupleNumber={inputNumber} /> : null}
            {(competitionType === 'fixed couples') ? <CoupleInput handleSubmit={handleSubmit} coupleNumber={inputNumber} /> : null}            
        </>

    );
};



