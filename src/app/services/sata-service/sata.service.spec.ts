import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ISata } from '@models/sata.model';
import { SataService } from '@services/sata-service/sata.service';
import { SnackbarService } from '@services/snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

describe('SataService', () => {
  let injector: TestBed;
  let service: SataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [SataService, SnackbarService],
    });
    injector = getTestBed();
    service = injector.inject(SataService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should have apiEndpoint in Enviroment', () => {
    expect(environment.remoteServer).toBeDefined();
  });

  it('should return an Observable <ISata> ', () => {
    const dummyLocation: ISata = {
      timestamp: 1629627810000,
      iss_position: { longitude: '3.8126', latitude: '48.7340' },
      message: 'success',
      name: 'Test Location',
    };

    service.getSataCurrentLocation().subscribe((location) => {
      expect(location).toEqual(dummyLocation);
    });

    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLocation);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
