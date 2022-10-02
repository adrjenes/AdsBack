import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";


const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9,
}

afterAll(async () => {
    await pool.end();
})

test('AdRecord returns data from database for one entry.', async () => {

    const ad = await AdRecord.getOne('abc');
    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Testowa');

});

test('AdRecord returns null from database for unexisting entry.', async () => {

    const ad = await AdRecord.getOne('-----');

    expect(ad).toBeNull();

})


test('AdRecord.insert inserts returns new UUID.', async () => {

    const ad = new AdRecord(defaultObj);
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
})
test('AdRecord.insert inserts data to database.', async () => {

    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd).toBe(ad.id);

})



