export const randomReady: any = {
  TopTab: {
    pINNCGRL: {
      wsFZGTGP: 'sfypxPu',
      ULqNhbbp: true,
      subObj: {
        vPDastKt: 'asdf',
      },
      vPDjatKt: null,
      OFyFWvpv: 0.7629140494764629,
    },
    adfSjkDa: {
      PohtWFRj: null,
      JlqxFDjc: false,
      Yjjrrixe: 'mIxIA',
    },
  },
}

export function createRandomObj(fieldCount: number, allowNested: boolean) {
  const generatedObj: any = {}

  for (let i = 0; i < fieldCount; i++) {
    let generatedObjField

    switch (randomInt(allowNested ? 6 : 5)) {

      case 0:
        generatedObjField = randomInt(1000)
        break

      case 1:
        generatedObjField = Math.random()
        break

      case 2:
        generatedObjField = Math.random() < 0.5 ? true : false
        break

      case 3:
        generatedObjField = randomString(randomInt(4) + 4)
        break

      case 4:
        generatedObjField = null
        break

      case 5:
        generatedObjField = createRandomObj(fieldCount, allowNested)
        break
    }
    generatedObj[randomString(8)] = generatedObjField
  }
  return generatedObj
}

// helper functions

function randomInt(rightBound: number) {
  return Math.floor(Math.random() * rightBound)
}

function randomString(size: number) {
  const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let generatedString = ''
  for (let i = 0; i < size; i++) {
    generatedString += alphaChars[randomInt(alphaChars.length)]
  }

  return generatedString
}