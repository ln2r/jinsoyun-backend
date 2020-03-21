const fetchDB = require('./fetchDB');
/**
   * fetchQuests
   * getting quests list data
   * @param {Array} questsList array of quests's id
   * @return {Array} formatted quests list
   */
module.exports = async function (questsIdList){
    let questsData = await fetchDB("quests");
    let questsList = [];

    let dungeonsData = await fetchDB("dungeons");

    // getting the quests name and location
    for(let i=0; i<questsIdList.length; i++){
      for(let j=0; j<questsData.length; j++){
        if(questsIdList[i] === questsData[j].id){
          let questName = questsData[j].name;
          let questLocations = [];

          // getting the location
          for(let k=0; k<questsData[j].location.length; k++){
            for(let l=0; l<dungeonsData.length; l++){
              if(questsData[j].location[k] === dungeonsData[l].id){
                if(questsData[j].type === 2) questName = questName + " (Dynamic)";

                questLocations.push(dungeonsData[l].name);
              }
            }
          }          

          questsList.push({
            name: questName,
            location: questLocations
          });
        }
      }
    }

    return questsList;
}