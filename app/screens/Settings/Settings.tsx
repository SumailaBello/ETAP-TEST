import { View, Text, Switch } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Screen } from '../../utils/types'
import Container from '../../components/Container/Container'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import ListItem from '../../components/ListItem/ListItem'
import { toggleBatterySaver } from '../../store/appSettings'

const Settings:FC<Screen> = ({route, navigation}) => {
    //GLOBAL STATE
    const {theme, batterySaver} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();
    
    return (
        <Container>
            <ListItem title='Battery Saver' 
            subtitle='Auto disables tracking when idle'
                icon={
                    <Switch 
                        value={batterySaver} 
                        onChange={(event)=> {
                            event.persist();
                            dispatch(toggleBatterySaver());
                        }}
                        thumbColor={theme.primary.main}
                    />
                }
                iconPosition='right'
                textColor={theme.dark}
            />
        </Container>
    )
}

export default Settings