// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return{
    specimenNum,
    dna,
    mutate (){

      let randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase){
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },

    compareDNA(otherOrg){
      const similarities = this.dna.reduce((acc, curr, index, arr) =>{
        if(arr[index] === otherOrg.dna[index]){
          return acc+1;
        }
        else {
          return acc;
        }
      }, 0);
    const percentageShared = (similarities / this.dna.length) * 100;
    const perct2 = percentageShared.toFixed(2);
    console.log(`${this.specimanNum} and ${otherOrg.specimenNum} have ${perct2}% DNA in common.`);
    },

       willLikelySurvive(){
      const cOrg = this.dna.filter(element => element === 'C' || element === 'G');
      return cOrg.length / this.dna.length >= 0.6;
    }
      }
  }

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen)


