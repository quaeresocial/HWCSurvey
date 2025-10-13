import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Container from '../../common/Container';
import ImageAssets from '../../common/ImageAssets';
import HeaderBar from '../../coomon_component/headerBar';
import CustomDropDown from '../../coomon_component/CustomDropDown';
import KeyBoardType from '../../common/KeyBoardType';
import CustomInput from '../../coomon_component/CustomInput';
import {font_style} from '../../common/MyStyles';
import Colors from '../../common/Colors';
import MyRadioButton from '../../coomon_component/RadioButton';
// import Geolocation from '@react-native-community/geolocation'
import CustomUpload from '../../coomon_component/CustomUpload';
import {MyImageFilePicker} from '../../coomon_component/MyImageFilePicker';
import MyButton from '../../coomon_component/MyButton';
import {
  isEmpty,
  isValidIndianMobileNumber,
  isValidName,
  showToast,
} from '../../common/common';
import {setLoading} from '../../redux_store/actions/indexActions';
import {
  HwcSourceListApi,
  allGrampanchayat,
  allVillageApi,
  serviceDetail,
  updateserviceDetail,
  uploadImageApi,
} from '../../API/APICall';
import Adapter from './Adapter';
import DropDownAdapter from '../../common/DropDownAdapter';
import MyDialog from '../../coomon_component/MyDialog';
import Constants from '../../common/Constants';

const EditFacility = props => {
  const dispatch = useDispatch();
  const value = props?.route?.params?.item;
  const [totalpopulation, setTotalPopulation] = useState('');
  const [anm, setAnm] = useState('');
  const [noofschool, setNoofschool] = useState('');
  const [eligiblecouple, setEligibleCouple] = useState('');
  const [pregnentwomen, setPregnentwomen] = useState('');
  const [zerotoone, setZerotoone] = useState('');
  const [active, setActive] = useState(false);
  const [filePicker1, setFilePicker1] = useState(false);
  const [imageurl1, setImageUrl1] = useState('');
  const [filePicker2, setFilePicker2] = useState(false);
  const [fundrecieved, setFundRecieved] = useState(false);
  const [imageurl2, setImageUrl2] = useState('');
  const [nin, setNin] = useState('');
  const [servicelist, setServiceList] = useState([]);
  const [data, setData] = useState([]);
  const [grampanchyat, setGrampanchyat] = useState('');
  const [grampanchyatname, setGrampanchyatName] = useState('');
  const [grampanchyatlist, setGrampanchyatList] = useState([]);
  const [village, setVillage] = useState('');
  const [villagename, setVillagename] = useState('');
  const [villagelist, setVillageList] = useState([]);
  const [choname, setChoName] = useState('');
  const [chomobile, setChoMobile] = useState('');
  const [anmname, setAnmName] = useState('');
  const [anmmobile, setAnmMobile] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [swclist, setHwcList] = useState([]);
  const [hwcid, setHwcId] = useState(0);
  const [hwcname, setHwcName] = useState('');
  const [selecetd, setSelecetd] = useState('');

  useEffect(() => {
    HwcSourceList();
    allDetailData();
  }, []);

  const allDetailData = () => {
    let param = {Fk_FacilityId: value?.FK_FacilityCode};
    dispatch(setLoading(true));
    serviceDetail(
      param,
      async res => {
        console.log(res, '======>>>Service Detail Api Response');
        if (res?.response === 'success') {
          setData(res);
          setHwcId(res?.Fk_HWCSourceId);
          setImageUrl1(res?.Image1);
          setImageUrl2(res?.Image2);
          setChoName(res?.CHOName);
          setGrampanchyat(res?.Fk_GramPanchayatId);
          setVillage(res?.Fk_VillageId);
          setTotalPopulation(res?.TotalPopulation);
          setAnm(res?.ANM);
          setNoofschool(res?.NoOfSchool);
          setEligibleCouple(res?.EligibleCouple);
          setPregnentwomen(res?.NoOfPregnantWomen);
          setZerotoone(res?.ZeroOneYearChildren);
          setChoMobile(res?.CHOMobile);
          setAnmName(res?.ANMName);
          setAnmMobile(res?.ANMMobile);
          setFundRecieved(res?.IsJSY);
          setGrampanchyatName(res?.GramPanchayatName);
          setVillagename(res?.VillageName);
          allGramPanchayat(res?.FK_BlockID);
          setServiceList(res?.HWCSeriveTypeList);
          setNin(res?.NIN);
          const foundData = res?.HWCSeriveTypeList.find(
            item => item?.Pk_ServiceId === 2,
          );
          if (foundData?.Ischecked == 0) {
            setSelecetd('');
          } else {
            setSelecetd(foundData?.ServiceName);
          }
          dispatch(setLoading(false));
          setActive(true);
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast('something went wrong');
        console.log(error);
      },
    );
  };

  const HwcSourceList = name => {
    HwcSourceListApi(
      async res => {
        if (res?.response === 'success') {
          console.log(res?.hWCSourcesLists);
          setHwcList(res?.hWCSourcesLists);
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast(res?.message);
        console.log(error);
      },
    );
  };

  useEffect(() => {
    if (hwcid == 0) return;
    const foundData = swclist.find(item => item.Pk_sourceId == hwcid);
    if (foundData) {
      setHwcName(foundData?.SourceName);
    } else {
      setHwcName('');
    }
  }, [hwcid]);

  const handleUpdate = () => {
    if (!isValidName(choname)) {
      showToast('Enter CHO Name');
    } else if (!isValidIndianMobileNumber(chomobile)) {
      showToast('Enter valid CHO mobile number');
    } else if (!isValidName(anmname)) {
      showToast('Enter ANM Name');
    } else if (!isValidIndianMobileNumber(anmmobile)) {
      showToast('Enter valid ANM mobile number');
    } else if (isEmpty(village)) {
      showToast('Select Village');
    } else if (isEmpty(totalpopulation)) {
      showToast('Enter total population');
    } else if (isEmpty(anm)) {
      showToast('Enter Asha Count');
    } else if (isEmpty(noofschool)) {
      showToast('Enter no. of School');
    } else if (isEmpty(eligiblecouple)) {
      showToast('Enter AWW');
    } else if (isEmpty(pregnentwomen)) {
      showToast('Enter Diagnostic Test Available');
    } else if (isEmpty(zerotoone)) {
      showToast('No. of Medicine Available');
    } else if (isEmpty(nin)) {
      showToast('Enter NIN');
    } else if (/^0+$/.test(nin)) {
      showToast('NIN cannot be zeros');
    } else if (!/^[0-9]\d{9,14}$/.test(nin)) {
      showToast('NIN must be between 10 and 15 digits');
    } else {
      handleValidation();
    }
  };

  const validateCheckedServices = () => {
    const anyChecked = servicelist.some(item => item.Ischecked === 1);
    return anyChecked;
  };

  const handleValidation = () => {
    if (validateCheckedServices()) {
      if (selecetd === 'Availability of Water Supply') {
        handleValidateWaterSupply();
      } else {
        imgValidate();
      }
    } else {
      showToast('Please select services available.');
    }
  };

  const handleValidateWaterSupply = () => {
    if (hwcid == 0) {
      showToast('Please select water supply source');
    } else {
      if (isEmpty(hwcname)) {
        showToast('Please select water supply source');
      } else {
        imgValidate();
      }
    }
  };

  const imgValidate = () => {
    if (isEmpty(imageurl1)) {
      showToast('Please upload image clear name with branding');
    } else if (isEmpty(imageurl2)) {
      showToast('Please upload image service delivery');
    } else {
      imageValidate();
    }
  };

  const imageValidate = () => {
    const data = [];
    servicelist.map(item => {
      if (item?.Ischecked == '1') {
        const obj = {
          Pk_serviceId: item?.Pk_ServiceId,
        };
        data.push(obj);
      }
    });
    let param = {
      Fk_FacilityId: value?.FK_FacilityCode,
      FacilityCode: value?.FacilityCode,
      FacilityName: value?.FacilityName,
      Fk_GramPanchayatId: grampanchyat,
      Fk_VillageId: village,
      CHOName: choname,
      CHOMobile: chomobile,
      ANMName: anmname,
      ANMMobile: anmmobile,
      IsJSY: fundrecieved,
      TotalPopulation: totalpopulation,
      ANM: anm,
      NoOfSchool: noofschool,
      EligibleCouple: eligiblecouple,
      NoOfPregnantWomen: pregnentwomen,
      ZeroOneYearChildren: zerotoone,
      Image1: imageurl1,
      Image2: imageurl2,
      hWCSeriveTypes: data,
      NIN: nin,
      Fk_HWCSourceId: hwcid,
    };

    console.log(param, '=======================>>>>');

    dispatch(setLoading(true));
    updateserviceDetail(
      param,
      async res => {
        console.log(res, '======>>>Update Service Detail Api Response');
        if (res?.response === 'success') {
          showToast('Facility update successfully');
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          });
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        // showToast(res?.message);
        console.log(error);
      },
    );
  };

  const allGramPanchayat = id => {
    let param = {BlockID: id};
    allGrampanchayat(
      param,
      async res => {
        // console.log(res, '======>>>All Grampanchayat Api Response')
        if (res?.response === 'success') {
          setGrampanchyatList(res?.AllBlockGrampanchayatLists);
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast(res?.message);
        console.log(error);
      },
    );
  };

  const allVillage = id => {
    let param = {GramPanchayatId: id};
    dispatch(setLoading(true));
    allVillageApi(
      param,
      async res => {
        // console.log(res, '======>>>All Village Api Response')
        if (res?.response === 'success') {
          setVillageList(res?.AllVillageGrampanchayatLists);
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast(res?.message);
        console.log(error);
      },
    );
  };

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(info => {
  //     console.log(info?.coords?.latitude, info?.coords?.longitude)
  //     setLat(JSON.stringify(info?.coords?.latitude))
  //     setLong(JSON.stringify(info?.coords?.longitude))
  //   })
  // })

  // const handleLocation = () => {
  //   setLat('')
  //   setLong('')
  //   dispatch(setLoading(true))
  //   Geolocation.getCurrentPosition(info => {
  //     console.log(info?.coords?.latitude, info?.coords?.longitude)
  //     if (info?.coords?.latitude) {
  //       setLat(JSON.stringify(info?.coords?.latitude))
  //       setLong(JSON.stringify(info?.coords?.longitude))
  //       dispatch(setLoading(false))
  //     } else {
  //       dispatch(setLoading(false))
  //     }
  //     dispatch(setLoading(false))
  //   })
  // }

  const upload_image = (image, type) => {
    dispatch(setLoading(true));
    let formData = new FormData();
    formData.append('user', image);
    uploadImageApi(
      formData,
      res => {
        console.log('====> Image Upload Response', res, type);
        if (res.Response == 'Success') {
          if (type == 'first') {
            setImageUrl1(res.Remark);
            dispatch(setLoading(false));
          } else {
            setImageUrl2(res.Remark);
            dispatch(setLoading(false));
          }
        } else {
          showToast(res?.Response);
        }
      },
      error => {
        dispatch(setLoading(false));
        console.log('err >', error);
      },
    );
  };

  const handleService = value => {
    const updatedServices = servicelist.map(item =>
      item.Pk_ServiceId === value?.Pk_ServiceId
        ? {...item, Ischecked: item.Ischecked === 0 ? 1 : 0}
        : item,
    );
    setServiceList(updatedServices);
    const foundData = updatedServices.find(item => item?.Pk_ServiceId === 2);
    if (foundData?.Ischecked == 0) {
      setSelecetd('');
      setHwcName('');
      setHwcId(0);
    } else {
      setSelecetd(foundData?.ServiceName);
    }
  };

  return (
    <Container>
      <HeaderBar
        title={'Edit Facility'}
        onBack={() => props.navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {active && (
          <>
            <View style={{paddingVertical: 10, width: width - 30}}>
              <CustomInput
                inputTitle={'Community Health Officer Name'}
                ontainer_style={{width: '100%'}}
                keyboardType={KeyBoardType.default}
                value={choname}
                onValue={val => {
                  const regex = val.replace(/[^a-zA-Z]/g, '');
                  setChoName(regex);
                }}
              />
              <CustomInput
                inputTitle={'Community Health Officer Mobile'}
                ontainer_style={{width: '100%'}}
                keyboardType={KeyBoardType.number_pad}
                value={chomobile}
                onValue={val => setChoMobile(val)}
                maxLength={10}
              />
              <CustomInput
                inputTitle={'ANM Name'}
                ontainer_style={{width: '100%'}}
                keyboardType={KeyBoardType.default}
                value={anmname}
                onValue={val => {
                  const regex = val.replace(/[^a-zA-Z]/g, '');
                  setAnmName(regex);
                }}
              />
              <CustomInput
                inputTitle={'ANM Mobile'}
                ontainer_style={{width: '100%'}}
                keyboardType={KeyBoardType.number_pad}
                value={anmmobile}
                onValue={val => setAnmMobile(val)}
                maxLength={10}
              />
              <CustomDropDown
                inputTitle={'Facility Name'}
                value={data?.FacilityName}
                container_style={{backgroundColor: Colors.lightGrey}}
              />
              <CustomDropDown
                inputTitle={'Facility Type'}
                value={data?.FacilityType}
                container_style={{backgroundColor: Colors.lightGrey}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomDropDown
                  inputTitle={'Division'}
                  value={data?.DivisionName}
                  container_style={{
                    width: width / 2 - 20,
                    backgroundColor: Colors.lightGrey,
                  }}
                />
                <CustomDropDown
                  inputTitle={'District'}
                  value={data?.DistrictName}
                  container_style={{
                    width: width / 2 - 20,
                    backgroundColor: Colors.lightGrey,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomDropDown
                  inputTitle={'Tehsil'}
                  value={data?.TehsilName}
                  container_style={{
                    width: width / 2 - 20,
                    backgroundColor: Colors.lightGrey,
                  }}
                />
                <CustomDropDown
                  inputTitle={'Block'}
                  value={data?.BlockName}
                  container_style={{
                    width: width / 2 - 20,
                    backgroundColor: Colors.lightGrey,
                  }}
                />
              </View>

              <CustomDropDown
                onPress={() => setShow1(true)}
                inputTitle={'Grampanchayat'}
                value={
                  grampanchyatname ? grampanchyatname : 'Select Grampanchayat'
                }
                righticon={ImageAssets.down}
              />
              <CustomDropDown
                onPress={() => setShow2(true)}
                inputTitle={'Village'}
                value={villagename ? villagename : 'Select Village'}
                righticon={ImageAssets.down}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomInput
                  inputTitle={'Total Population'}
                  container_style={{width: width / 2 - 20}}
                  keyboardType={KeyBoardType.number_pad}
                  value={totalpopulation}
                  onValue={val => setTotalPopulation(val)}
                />

                <CustomInput
                  inputTitle={'No of ASHA'}
                  container_style={{width: width / 2 - 20}}
                  keyboardType={KeyBoardType.number_pad}
                  value={anm}
                  onValue={val => setAnm(val)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomInput
                  inputTitle={'No. of Schools'}
                  container_style={{width: width / 2 - 20}}
                  keyboardType={KeyBoardType.number_pad}
                  value={noofschool}
                  onValue={val => setNoofschool(val)}
                />

                <CustomInput
                  inputTitle={'No of AWW'}
                  container_style={{width: width / 2 - 20}}
                  keyboardType={KeyBoardType.number_pad}
                  value={eligiblecouple}
                  onValue={val => setEligibleCouple(val)}
                />
              </View>
              <CustomInput
                inputTitle={'No of Diagnostic Test Available'}
                container_style={{width: '100%'}}
                keyboardType={KeyBoardType.number_pad}
                value={pregnentwomen}
                onValue={val => setPregnentwomen(val)}
              />

              <CustomInput
                inputTitle={'No of Medicine Available'}
                container_style={{width: '100%'}}
                keyboardType={KeyBoardType.number_pad}
                value={zerotoone}
                onValue={val => setZerotoone(val)}
              />
              {/* </View> */}
              <CustomInput
                inputTitle={'NIN'}
                container_style={{width: '100%'}}
                keyboardType={KeyBoardType.number_pad}
                value={nin}
                onValue={val => setNin(val)}
                maxLength={15}
              />
              <View style={{paddingVertical: 10}}>
                <MyRadioButton
                  textStyle={[font_style.text_14_600, {color: Colors.black}]}
                  text={'Is JAS Fund Recieved In FY 2024-25'}
                  onPress={() => setFundRecieved(!fundrecieved)}
                  isChecked={fundrecieved}
                />
              </View>
              <Text
                style={[
                  font_style.text_14_700,
                  {color: Colors.black, paddingVertical: 5, marginBottom: 10},
                ]}>
                {'Services Available'}
                <Text style={[font_style.text_14_700, {color: Colors.red}]}>
                  {' *'}
                </Text>
              </Text>
              <Adapter
                data={servicelist}
                onPress={item => handleService(item)}
              />
            </View>
            {selecetd == 'Availability of Water Supply' && (
              <CustomDropDown
                required={' *'}
                onPress={() => setShow3(true)}
                inputTitle={'Water supply source'}
                value={hwcname ? hwcname : 'Please select'}
                righticon={ImageAssets.down}
              />
            )}
            <Text
              style={[
                font_style.text_14_700,
                {color: Colors.black, paddingVertical: 5},
              ]}>
              {'Facility Image Upload'}
            </Text>
            <CustomUpload
              title={'Clear name and branding'}
              required={' *'}
              icon={ImageAssets.uploadicon}
              onPress={() => setFilePicker1(true)}
              image={imageurl1 ? Constants.IMAGE_BASE_URL + imageurl1 : ''}
              Clear={() => {
                setImageUrl1('');
              }}
            />
            <CustomUpload
              title={'Service delivery'}
              required={' *'}
              icon={ImageAssets.uploadicon}
              onPress={() => setFilePicker2(true)}
              image={imageurl2 ? Constants.IMAGE_BASE_URL + imageurl2 : ''}
              Clear={() => {
                setImageUrl2('');
              }}
            />
            <View style={{marginBottom: 40}}>
              <MyButton
                btnText={'Update'}
                btnstyle={{width: '40%'}}
                onPress={() => handleUpdate()}
              />
            </View>
          </>
        )}
      </ScrollView>
      <MyImageFilePicker
        isFile={false}
        onlyCamera={false}
        isUploadPhotoModal={filePicker1}
        closePicker={() => setFilePicker1(false)}
        setImage={imageRes => {
          // console.log('image-->', imageRes);
          upload_image(imageRes, 'first');
        }}
      />
      <MyImageFilePicker
        isFile={false}
        onlyCamera={false}
        isUploadPhotoModal={filePicker2}
        closePicker={() => setFilePicker2(false)}
        setImage={imageRes => {
          // console.log('image-->', imageRes);
          upload_image(imageRes, 'second');
        }}
      />
      {show1 && (
        <MyDialog
          children={
            <DropDownAdapter
              heading={'All Grampanchayat'}
              data={grampanchyatlist}
              onClose={() => setShow1(false)}
              onSelect={item => {
                console.log(item);
                setGrampanchyat(item.GramPanchayatId);
                setGrampanchyatName(item.GramPanchayatName);
                setVillage('');
                setVillagename('');
                allVillage(item?.GramPanchayatCode);
                setShow1(false);
              }}
              keyName={'GramPanchayatName'}
            />
          }
        />
      )}
      {show2 && (
        <MyDialog
          children={
            <DropDownAdapter
              heading={'All Village'}
              data={villagelist}
              onClose={() => setShow2(false)}
              onSelect={item => {
                setVillage(item.VillageId);
                setVillagename(item?.VillageName);
                setShow2(false);
              }}
              keyName={'VillageName'}
            />
          }
        />
      )}
      {show3 && (
        <MyDialog
          children={
            <DropDownAdapter
              heading={'Water supply source'}
              data={swclist}
              onClose={() => setShow3(false)}
              onSelect={item => {
                setHwcId(item.Pk_sourceId);
                setHwcName(item?.SourceName);
                setShow3(false);
              }}
              keyName={'SourceName'}
            />
          }
        />
      )}
    </Container>
  );
};

const {width, height} = Dimensions.get('window');
export default EditFacility;
