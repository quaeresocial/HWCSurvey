import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import {showToast} from '../common/common';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {font_style} from '../common/MyStyles';
export const MyImageFilePicker = props => {
  const handlePermission = async () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ],
    ).then(result => {});
  };

  useEffect(() => {
    handlePermission();
  },[]);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log('imgRes-->', image);
      if (image?.size > 0) {
        const imgRes = {};
        imgRes['name'] = image?.modificationDate + '.jpg';
        imgRes['size'] = image?.size;
        imgRes['type'] = image?.mime;
        imgRes['uri'] = image?.path;
        props.setImage(imgRes);
      }
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log('imgRes-->', image);
      if (image?.size > 0) {
        const imgRes = {};
        imgRes['name'] = image?.modificationDate + '.jpg';
        imgRes['size'] = image?.size;
        imgRes['type'] = image?.mime;
        imgRes['uri'] = image?.path;
        props.setImage(imgRes);
      }
    });
  };

  const options = {
    quality: 0.1,
    mediaType: 'photo',
    saveToPhotos: true,
  };
  let timeout = 200;
  return openImagePicker();
  function openImagePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isUploadPhotoModal}
        onRequestClose={() => {
          props.closePicker();
        }}
        onDismiss={() => {
          props.closePicker();
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[font_style.text_18_600, {color: Colors.black}]}>
                {props.isFile ? 'Choose File' : 'Select option'}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', padding: 1}}
                onPress={() => {
                  props.closePicker();
                }}>
                <Image
                  source={ImageAssets.exit}
                  style={{width: 25, height: 25, tintColor: Colors.theme_color}}
                />
              </TouchableOpacity>
            </View>
            {props.isFile && (
              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => {
                  props.closePicker();
                  setTimeout(() => {
                    onFilePress();
                  }, timeout);
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={ImageAssets.gallery}
                    style={{width: 30, height: 30}}
                  />

                  <Text style={{color: Colors.black, marginLeft: 10}}>
                    Select from storage
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {!props.onlyCamera && (
              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => {
                  props.closePicker();
                  setTimeout(() => {
                    openGallery();
                  }, timeout);
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={ImageAssets.gallery}
                    style={{width: 30, height: 30}}
                  />

                  <Text
                    style={[
                      font_style.text_14_600,
                      {color: Colors.darkGray, marginLeft: 10},
                    ]}>
                    Select from Gallery
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => {
                props.closePicker();

                setTimeout(() => {
                  openCamera();
                }, timeout);
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={ImageAssets.camera}
                  style={{width: 30, height: 30}}
                />

                <Text
                  style={[
                    font_style.text_14_600,
                    {color: Colors.darkGray, marginLeft: 10},
                  ]}>
                  Open Camera
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  async function onFilePress() {
    props.closePicker();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      if (
        !(
          res.type === 'image/jpg' ||
          res.type === 'image/jpeg' ||
          res.type === 'image/png' ||
          res.type === 'application/pdf'
        )
      ) {
        showToast(
          'This image format is not supported! Please select jpeg, jpg, png or pdf format.',
        );
        return;
      }
      let sizeInMB = (res.size / (1024 * 1024)).toFixed(2);
      if (sizeInMB > 10) {
        console.showToast('Size should be less then 10 MB!');
        return;
      }
      props.setImage(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Cancelled select document', err);
      } else {
        throw err;
      }
    }
  }

  function onCameraOpenPress() {
    props.closePicker();
    launchCamera(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const imgRes = {};
        if (response?.assets?.length > 0) {
          imgRes['name'] = response?.assets[0]?.fileName?.replace(
            'rn_image_picker_lib_temp_',
            '',
          );
          imgRes['size'] = response?.assets[0]?.fileSize;
          imgRes['type'] = response?.assets[0]?.type;
          imgRes['uri'] = response?.assets[0]?.uri;
          props.setImage(imgRes);
        }
      }
    });
  }
  function onGalleryPress() {
    props.closePicker();
    launchImageLibrary(options, response => {
      if (response?.error) {
        showToast(response?.error);
        return;
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let sizeInMB = (response?.assets[0]?.fileSize / (1024 * 1024)).toFixed(
          2,
        );
        if (sizeInMB > 10) {
          console.showToast('Size should be less then 10 MB!');
          return;
        }
        const imgRes = {};
        if (response?.assets?.length > 0) {
          imgRes['name'] = response?.assets[0]?.fileName?.replace(
            'rn_image_picker_lib_temp_',
            '',
          );
          imgRes['size'] = response?.assets[0]?.fileSize;
          imgRes['type'] = response?.assets[0]?.type;
          imgRes['uri'] = response?.assets[0]?.uri;
          props.setImage(imgRes);
        }
      }
    });
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.top_color,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  submitButtonStyle: {
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
    backgroundColor: Colors.orange_color,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  accountTypeText: {color: Colors.black, fontSize: 16, fontWeight: '500'},
  inputStyle: {height: 48, paddingTop: 15},
  inputContainer: {marginTop: 20},
  suggestionText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.black,
    paddingHorizontal: 10,
  },
  suggestionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderColor: '#F5D9AB',
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
