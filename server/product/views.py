# date-created: 19-feb-2022
# usage: return the json string after querying the database
# calling function/module: product/urls.py


from customer.models import Feedback
from customer.serializers import FeedbackSerializer
from publisher.models import Shop
from publisher.serializers import ShopSerializer
from .serializers import (ProductSerializer, TagSerializer, ImagesSerializer)
from .models import Images, Product, Tag
from rest_framework import renderers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes, APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser


def p():
    print('\n'+'-'*16+'NEW REQUEST'+'-'*16+'\n')


class SingleProductView(APIView):
    def get(self, request, pk):
        try:
            singleInstance = Product.objects.get(productId=pk)
            serializedData = ProductSerializer(
                singleInstance, many=False)
            return Response(data=serializedData.data)
        except Product.DoesNotExist:
            # for if the resulting query set is empty
            return Response(status=status.HTTP_404_NOT_FOUND)


class TagListView(APIView):
    def get(self, request):
        try:
            data = {
                'status': 500,
                'data': []
            }
            tagInstanceList = Tag.objects.all()
            data['data'] = TagSerializer(
                tagInstanceList, many=True).data
            data['status'] = 200

            response = Response()
            response.set_cookie(
                key='cookie_key', value='cookie_value', httponly=False
            )
            response.data = data
            response.status_code = status.HTTP_200_OK
            return response

        except Tag.DoesNotExist:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)


class ProductListView(APIView):
    def get(self, request, pincode=208012):
        try:
            productInstanceList = Product.objects.all()
            serializedData = ProductSerializer(
                productInstanceList, many=True)
            return Response(data=serializedData.data)
        except Product.DoesNotExist:
            # for if the resulting query set is empty
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception:
            print(Exception.__cause__)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FeedbackListView(APIView):

    def get(self, request, productId):
        data = {
            'status': 500,
            'feedbacks': []
        }
        try:
            feedbackInstanceList = Feedback.objects.filter(
                productId_id=productId)
            data['feedbacks'] = FeedbackSerializer(
                instance=feedbackInstanceList, many=True).data
            data['status'] = 200
        except Feedback.DoesNotExist:
            data['status'] = 404
        except Exception:
            print(Exception.__cause__)

        finally:
            return Response(data=data, status=status.HTTP_200_OK)


class AddProductView(APIView):
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        # facing unsupported media file type, in request.data
        p()
        print(f'AddProductView for id={request.user.id}')
        data = {
            'status': 500,
            'product': None
        }
        try:
            formData = request.data
            product = Product.objects.get(name=formData['name'])
            data['status'] = 409
            print('product does exist')

        except Product.DoesNotExist:
            print('product does not exist')
            data1 = ProductSerializer().create(validated_data=formData)
            data['status'] = 201
            data['product'] = ProductSerializer(
                instance=data1).data

        except Exception:
            print(f'some error occured in AddProductView')

        finally:
            return Response(data=data, status=status.HTTP_200_OK)

    def put(self, request):
        pass


class ProductsByTagView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, tagId):
        try:
            data = {
                'status': 500,
                'products': []
            }

            productInstances = Product.objects.filter(tagId_id=tagId)
            data['products'] = ProductSerializer(
                instance=productInstances, many=True).data

        except Product.DoesNotExist:
            data['status'] = 404
        except Exception:
            print('some error occured in ProductsByTag view')

        else:
            data['status'] = 200

        finally:
            return Response(data=data, status=status.HTTP_200_OK)


class UpdateProductView(APIView):
    authentication_classes = (JWTAuthentication, )

    def put(self, request):
        p()
        data = {
            'status': 500,
            'product': None
        }
        try:
            formData = request.data
            data1 = ProductSerializer().create(validated_data=formData)
            data['product'] = ProductSerializer(
                instance=data1).data

        except Product.DoesNotExist:
            print('product does not exists')
            data['status'] = 404
        except Exception:
            print(Exception.__cause__)
            print('some error occured')

        else:
            data['status'] = 201
        finally:
            return Response(data=data, status=status.HTTP_201_CREATED)


class JpegImageRenderer(renderers.BaseRenderer):
    media_type = 'image/jpeg'
    format = 'jpg'
    charset = None
    render_style = 'binary'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data


class ImageView(APIView):
    renderer_classes = [JpegImageRenderer, ]

    def get(self, request, id):
        query_set = Product.objects.get(productId=id).photo
        return Response(data=query_set, content_type='image/jpeg')


class SampleImageUpload(APIView):

    def post(self, request):
        instance = ImagesSerializer().create(validated_data=request.data)
        return Response(status=status.HTTP_200_OK)
