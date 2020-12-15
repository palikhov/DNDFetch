import React, { useState, useEffect } from "react";

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { red, purple, orange } from '@material-ui/core/colors';
import { ListItem } from "@material-ui/core";



function Feed(props){
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(props.cardLibrary);
    const [refresh, setRefresh] = useState(props.refresh)

    useEffect(()=>{
        // loadFeed()
        setData(props.cardLibrary)
        setRefresh(props.refresh)
    })

    const PurpleButton = withStyles((theme) => ({
        root: {
            textAlign: 'left',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            boxShadow: '0 0 0 0 black',
            borderRadius: 0,
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[500],
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button);

      const OrangeButton = withStyles((theme) => ({
        root: {
            textAlign: 'left',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            boxShadow: '0 0 0 0 black',
            borderRadius: 0,
          color: theme.palette.getContrastText(orange[500]),
          backgroundColor: orange[500],
          '&:hover': {
            backgroundColor: orange[700],
          },
        },
      }))(Button);


    const RedButton = withStyles((theme) => ({
        root: {
            borderRadius: 0,
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: red[500],
          '&:hover': {
            backgroundColor: red[700],
          },
        },
      }))(Button);

    function loadFeed(data){
        let arr = []
        let feed
        data.forEach(obj => {
            arr.push(obj.name)
        });
        console.log('is feed')
        console.log(data)
       feed = arr.map((x,y)=>returnListItem(x, data[y].cardType))
        return feed
    }

    function removeCardFromLibrary(name){
        props.removeCard(name)
    }

    function returnEmpty(){
        return(
            <div className="border-2 border-gray-500 rounded self-center px-10 opacity-25">
                <p className="text-center font-thing font-sm font-bold text-gray-500">No cards saved</p>

            </div>
        )
    }


    function returnListItem(name, type){
        console.log(name)
        console.log(type)
        let listItem;
        if (type == 'monsters'){
            listItem = <PurpleButton
variant="contained" color="primary"
onClick={()=>props.loadCard(name)} className="w-full p-4 relative z-0 cursor-pointer">
                <p className="modesto-condensed text-2xl uppercase text-white">{name}</p>

            </PurpleButton>
        } else if (type == 'loot'){
            listItem = <OrangeButton
variant="contained" color="primary"
onClick={()=>props.loadCard(name)} className="w-full p-4 relative z-0 cursor-pointer">
                <p className="modesto-condensed text-2xl uppercase text-gray-900">{name}</p>

            </OrangeButton>
        }

return(
    <div className="flex flex-row justify-between items-center border-b border-gray-500">
        {listItem}
             <RedButton onClick={()=>removeCardFromLibrary(name)} className="text-white hover:text-gray-300 cursor-pointer relative z-10 px-5 h-full items-center flex">
             <CloseIcon />
                 </RedButton>
    </div>

)
    }

    return(
        <div className={`flex ${data.length == 0 ? 'flex-row justify-center': 'flex-col'}  w-full bg-gray-900 overflow-y-scroll`}>
{data.length == 0
? returnEmpty()
: loadFeed(props.cardLibrary)
}
           </div>
    )
}

export default Feed