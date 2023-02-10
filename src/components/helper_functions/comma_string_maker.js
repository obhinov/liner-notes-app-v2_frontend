export default function comma_string_maker(customPerformances_ArtistList) {
    const newList = customPerformances_ArtistList.map((item) => (
        item.name
    ));
    const comma_string = newList.join(', ');
    return comma_string;
}