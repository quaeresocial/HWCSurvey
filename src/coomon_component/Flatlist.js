import React from 'react';
import { FlatList } from 'react-native';

const List = (props) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
            showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
            data={props.data}
            renderItem={props.renderItem}
            ItemSeparatorComponent={props.seperator}
            ListEmptyComponent={props.empty}
            ListFooterComponent={props.footer}
            ListHeaderComponent={props.header}
            extraData={props.extraData}
            getItemLayout={props.getItemLayout}
            horizontal={props.horizontal}
            initialScrollIndex={props.initialScrollIndex}
            inverted={props.inverted}
            keyExtractor={props.keyExtractor}
            numColumns={props.numColumns}
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={21}
            scrollToEnd={true}
            keyboardShouldPersistTaps={'handled'}
        />
    );
};

export default List;
