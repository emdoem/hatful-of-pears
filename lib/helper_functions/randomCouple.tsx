const getZiUser = require('zi-user');

export function randomCouple(e: any) {
    e.preventDefault();

    const idField = document.querySelector('input[name=id]') as HTMLInputElement | null;
    if (idField !== null) {
        console.log('Inserting random number!');
        const randomId = Math.floor(Math.random() * 100);
        // now this is some nonsense:
        idField.value = `${randomId}`;
        idField.stepUp();
        idField.stepDown();

        const changeEvent = new Event('change', { bubbles: true, cancelable: true });
        idField.dispatchEvent(changeEvent);
    }

    const followerField = document.querySelector('input[name=followerName]') as HTMLInputElement | null;
    if (followerField !== null) {
        console.log('Inserting random follower!');
        const randomFollower = `${getZiUser().firstName} ${getZiUser().lastName}`;
        followerField.value = randomFollower;
    }
}
