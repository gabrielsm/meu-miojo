const prompts = require('prompts');

function validateInput (value) {
    return value <= 0 ? `Somente números maiores que 0 são aceitos!` : true
}

(async () => {
    function getCookingTime(totalHourGlass_1, totalHourGlass_2){
        if(totalHourGlass_2 - totalHourGlass_1 == cooking){
            return totalHourGlass_2;
        }else if(totalHourGlass_1 > totalHourGlass_2){
            return getCookingTime(totalHourGlass_1, totalHourGlass_2 + hourglass_2);
        }else{
            return getCookingTime(totalHourGlass_1 + hourglass_1, totalHourGlass_2);
        }
    }

    const question_1 = await prompts({
        type: 'number',
        name: 'value',
        message: 'Qual é o total de tempo da primeira ampulheta?',
        validate: validateInput
    });

    const question_2 = await prompts({
        type: 'number',
        name: 'value',
        message: 'Qual é o total de tempo da segunda ampulheta?',
        validate: validateInput
    });

    const question_cooking = await prompts({
        type: 'number',
        name: 'value',
        message: 'Qual é o tempo indicado para o miojo cozinhar?',
        validate: validateInput
    });

    const hourglass_1 = question_1.value>question_2.value?question_1.value:question_2.value;//garantindo a ampulheta 1 como maior
    const hourglass_2 = question_2.value<question_1.value?question_2.value:question_1.value;
    const cooking = question_cooking.value;

    if(!areHourGlassesUseful(hourglass_1, hourglass_2, cooking)){
        console.log('Não será possível cozinhar com estas ampulhetas...');
        process.exit();
    }
    console.log('Tempo total de preparo será de ' + getCookingTime(hourglass_1, hourglass_2) + ' minutos!')
})();

function calculateMDC(time1, time2){
    let mod = time1%time2;
    if(mod==0){
        return time2;
    }else{
        return calculateMDC(time2, mod);
    }
}


function areHourGlassesUseful(time1, time2, cooking){
    if (time1 <= cooking || time2 <= cooking) {
        return false;
    }

    if (cooking % calculateMDC(time1, time2) != 0) {
        return false;
    }
    return true;
}