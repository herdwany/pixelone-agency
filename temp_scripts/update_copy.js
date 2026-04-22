const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../pixelone/content');
const files = fs.readdirSync(dir).filter(f => f.startsWith('service-') && f.endsWith('.ar.json'));

const stringReplacements = [
    { old: /???? ??????/g, new: '???? ??? ??????? ??????' },
    { old: /????? ?????? ??? ????/g, new: '????? ?????? ???? ??????' },
    { old: /???? ?????? ????/g, new: '????? ???? ????????' },
    { old: /????? ???????/g, new: '????? ???? ??? ????????' },
    { old: /?????? ?? ?????/g, new: '??? ????? ???????' },
    { old: /???? ??????/g, new: '???? ????? ???????' }
];

let modifiedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    let parsed = JSON.parse(original);
    
    let originalTextsLength = parsed.texts.length;
    let originalAttributesLength = parsed.attributes ? parsed.attributes.length : 0;
    
    let modified = false;
    
    parsed.texts = parsed.texts.map(text => {
        let newText = text;
        for (const replacement of stringReplacements) {
            newText = newText.replace(replacement.old, replacement.new);
        }
        if (newText !== text) modified = true;
        return newText;
    });

    if (parsed.attributes) {
        parsed.attributes = parsed.attributes.map(attr => {
            let newAttr = {...attr};
            if (attr.value) {
                let newVal = attr.value;
                for (const replacement of stringReplacements) {
                    newVal = newVal.replace(replacement.old, replacement.new);
                }
                newAttr.value = newVal;
                if (newVal !== attr.value) modified = true;
            }
            return newAttr;
        });
    }

    if (modified) {
        if (parsed.texts.length !== originalTextsLength) {
            console.error('ERROR: Length mismatch in', file);
            continue;
        }
        fs.writeFileSync(filePath, JSON.stringify(parsed, null, 4), 'utf8');
        modifiedCount++;
    }
}
console.log('Modified ' + modifiedCount + ' files.');
