import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFEditor,
  RHFTextField,
} from '../../../components/hook-form';
import {
  addPackage,
  updatePackage,
} from "../../../helpers/backend_helper";

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    startingPrice: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.title || '',
      duration: currentProduct?.duration || '',
      description: currentProduct?.description || '',
      cityName: currentProduct?.cityName || '',
      startingPrice: currentProduct?.startingPrice || 0,
      // plans: currentProduct?.tags || [TAGS_OPTION[0]],
      isMostPopular: true,
      isActive: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(isEdit,"submit ---", getValues());
      const product = {...currentProduct, ...getValues()};
      if(isEdit){
        await updatePackage(product);
      }else{
        delete product._id;
        await addPackage({
          ...product,
        });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Package Name" />
              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              {/* <div> */}
              {/*  <LabelStyle>Images</LabelStyle> */}
              {/*  <RHFUploadMultiFile */}
              {/*    name="images" */}
              {/*    showPreview */}
              {/*    accept="image/*" */}
              {/*    maxSize={3145728} */}
              {/*    onDrop={handleDrop} */}
              {/*    onRemove={handleRemove} */}
              {/*    onRemoveAll={handleRemoveAll} */}
              {/*  /> */}
              {/* </div> */}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <RHFSwitch name="isActive" label="isActive" />
              <RHFSwitch name="isMostPopular" label="isMostPopular" />

               <Stack spacing={3} mt={2}>
                 <RHFTextField name="cityName" label="City Name" />
                 {/* <RHFTextField name="sku" label="Product SKU" /> */}

                 {/* <div> */}
                 {/* <LabelStyle>Gender</LabelStyle> */}
                 {/* <RHFRadioGroup */}
                 {/*   name="gender" */}
                 {/*   options={GENDER_OPTION} */}
                 {/*   sx={{ */}
                 {/*     '& .MuiFormControlLabel-root': { mr: 4 }, */}
                 {/*   }} */}
                 {/* /> */}
                 {/* </div> */}


                 {/* <RHFSelect name="category" label="Category"> */}
                 {/* {CATEGORY_OPTION.map((category) => ( */}
                 {/*   <optgroup key={category.group} label={category.group}> */}
                 {/*     {category.classify.map((classify) => ( */}
                 {/*       <option key={classify} value={classify}> */}
                 {/*         {classify} */}
                 {/*       </option> */}
                 {/*     ))} */}
                 {/*   </optgroup> */}
                 {/* ))} */}
                 {/* </RHFSelect> */}

                {/* <Controller */}
                {/*  name="tags" */}
                {/*  control={control} */}
                {/*  render={({ field }) => ( */}
                {/*    <Autocomplete */}
                {/*      {...field} */}
                {/*      multiple */}
                {/*      freeSolo */}
                {/*      onChange={(event, newValue) => field.onChange(newValue)} */}
                {/*      options={TAGS_OPTION.map((option) => option)} */}
                {/*      renderTags={(value, getTagProps) => */}
                {/*        value.map((option, index) => ( */}
                {/*          <Chip {...getTagProps({ index })} key={option} size="small" label={option} /> */}
                {/*        )) */}
                {/*      } */}
                {/*      renderInput={(params) => <TextField label="Tags" {...params} />} */}
                {/*    /> */}
                {/*  )} */}
                {/* /> */}
               </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="startingPrice"
                  label="Starting Price"
                  placeholder="0.00"
                  value={getValues('startingPrice') === 0 ? '' : getValues('startingPrice')}
                  onChange={(event) => setValue('startingPrice', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />

                {/* <RHFTextField */}
                {/*  name="priceSale" */}
                {/*  label="Sale Price" */}
                {/*  placeholder="0.00" */}
                {/*  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')} */}
                {/*  onChange={(event) => setValue('priceSale', Number(event.target.value))} */}
                {/*  InputLabelProps={{ shrink: true }} */}
                {/*  InputProps={{ */}
                {/*    startAdornment: <InputAdornment position="start">$</InputAdornment>, */}
                {/*    type: 'number', */}
                {/*  }} */}
                {/* /> */}
              </Stack>

              {/* <RHFSwitch name="taxes" label="Price includes taxes" /> */}
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
